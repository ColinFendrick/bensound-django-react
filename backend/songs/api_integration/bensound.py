from io import BytesIO
from PIL import Image
import requests
import pathlib
import sqlite3
import datetime
from bs4 import BeautifulSoup

TODAY = datetime.datetime.today().strftime('%Y-%m-%d')

class BensoundAPI:
    def __init__(self):
        self.channels = None
        self.channel_playlist = None
        self.music_lists = None

    def extract_all_data(self):
        unique_titles = []
        media_list = []
        if not self.channels:
            self.extract_channels()
        channels = list(self.channels.keys())
        channel_playlist = {channel: [] for channel in channels}

        for channel_name in channels:
            channel_media = self.extract_channel_music(channel_name)
            for song in channel_media:
                channel_playlist[channel_name].append(song.title)
                if song.title not in unique_titles:
                    unique_titles.append(song.title)
                    media_list.append(song)
        self.music_lists = ([song.title for song in media_list], media_list)
        self.channel_playlist = channel_playlist

    def extract_channels(self):
        soup = self.__get_page_soup('https://www.bensound.com/')
        menu_tags = soup.find('div', id='menu').find_all('a')
        channels = {tag.text: tag['href']
                    for tag in menu_tags if tag.text != 'All'}
        self.channels = channels
        return channels

    def extract_channel_music(self, channel_name):
        if not self.channels:
            self.extract_channels
        channel_url = self.channels[channel_name]
        urls_to_fetch = [channel_url]
        urls_fetched = []
        songlist = []

        while urls_to_fetch:
            url = urls_to_fetch.pop(0)  # get first url in list
            urls_fetched.append(url)
            soup = self.__get_page_soup(url)  # extract html for parsing
            # find additional pages that may existing via pagination
            pages = self.__get_pagination(soup, urls_to_fetch, urls_fetched)
            if pages:
                urls_to_fetch.extend(pages)
            # extract the names of all songs from the page
            songlist.extend(self.__scrape_page_data(soup))

        return songlist

    def get_song_list(self):
        song_list = self.music_lists[0]
        if song_list:
            return song_list
        else:
            return(['No songs available'])

    def get_songs_by_channel(self, channel_name=None):
        if channel_name:
            try:
                print('Channel:', channel_name)
                print('Songs:')
                print(self.channel_playlist[channel_name])
            except KeyError:
                print('No songs available for this channel name')
        else:
            if self.channel_playlist:
                for channel, playlist in self.channel_playlist.items():
                    print('Channel:', channel)
                    print('Songs:')
                    print(playlist)
                    print('-'*55)
            else:
                print('No channel playlist available')

    def get_song_by_index(self, song_index):
        """Retrieve a song object by index"""
        try:
            return self.music_lists[song_index]
        except IndexError:
            print('Bad song index')
            return('Bad song index')

    def get_song_by_title(self, song_title):
        """Retrieve a song object by finding the first song with the title corresponding to `song_title`"""
        song_names = self.music_lists[0]
        song_objects = self.music_lists[1]
        if song_names:
            song_index = song_names.index(song_title)
            if song_index:
                try:
                    return song_objects[song_index]
                except IndexError:
                    print('Bad song index')
                    return('Bad song index')
            else:
                print('Song does not exists by that name')
                return('Song does not exist by that name')
        else:
            print('No songs currently available in `music_lists`')
            return('No songs currently available in `music_lists`')

    def __scrape_page_data(self, soup):
        """Extract media attributes for all media block containers on a page"""
        media_list = []
        block_container = soup.find('div', 'bloc_cat')
        blocks = block_container.find_all(
            'div', ['bloc_produit', 'bloc_produit1'])
        for block in blocks:
            attributes = self.__scrape_block_attributes(block)
            song = Song(**attributes)
            media_list.append(song)
        return media_list

    @staticmethod
    def __get_page_soup(url):
        """Request site content and return as BeautifulSoup object"""
        response = requests.get(url)
        if response.ok:
            return BeautifulSoup(response.text, 'lxml')

    @staticmethod
    def __get_pagination(soup, to_fetch, fetched):
        """Extract all pagination urls and return new items as a list"""
        nav_tags = soup.find('div', 'pagenavi').find_all('a', 'page')
        new_pages = []
        if nav_tags:
            for tag in nav_tags:
                url = tag['href']
                if url not in to_fetch and url not in fetched:
                    new_pages.append(url)
        return new_pages

    @staticmethod
    def __scrape_block_attributes(block):
        """Extract attributes for a single block_div media container and return as a dictionary"""
        attr = {}
        site_url = 'https://www.bensound.com/'
        attr['title'] = block.find('div', 'titre').p.text.strip()
        attr['length'] = block.find('p', 'totime').text.strip()
        attr['description'] = block.find('div', 'description').text.strip()
        attr['url_main'] = block.find('div', 'img_mini').a['href']
        attr['url_image'] = site_url + block.find('div', 'img_mini').img['src']
        attr['url_mp3'] = site_url + block.find('audio')['src']

        # available for download
        try:
            block.find('div', 'bouton_download').text.strip()
            attr['for_download'] = True
        except AttributeError:
            attr['for_download'] = False

        # available for purchase
        try:
            block.find('div', 'bouton_purchase').text.strip()
            attr['for_purchase'] = True
            attr['url_purchase'] = block.find('div', 'pop_license').a['href']
        except AttributeError:
            attr['for_purchase'] = False
            attr['url_purchase'] = ''

        # media license
        try:
            l1 = block.find('div', 'pop_license').h1.text.strip() + '.'
        except AttributeError:
            l1 = ""
        try:
            l2 = block.find('div', 'pop_license').p.text.strip() + '.'
        except AttributeError:
            l2 = ""
        l3 = ", ".join([span.text.strip()
                        for span in block.find_all('span', 'nothis')])
        attr['license'] = " ".join(
            [l1, l2, l3]).strip().replace('\xa0', ' ') + '.'

        return attr


class Song:
    def __init__(self, **kwargs):
        self.title = kwargs['title']
        self.length = kwargs['length']
        self.description = kwargs['description']
        self.for_download = kwargs['for_download']
        self.for_purchase = kwargs['for_purchase']
        self.license = kwargs['license']
        self.url_main = kwargs['url_main']
        self.url_image = kwargs['url_image']
        self.url_mp3 = kwargs['url_mp3']
        self.url_purchase = kwargs['url_purchase']
        self.modified = datetime.datetime.today().strftime('%Y-%m-%d')

    def get_properties(self):
        return self.__dict__

    def get_song_stream(self):
        """Get and return streaming bytes object
        
        Returns
        -------
        BytesIO
            A streaming BytesIO object for media playback.
        """
        response = requests.get(self.url_mp3, stream=True)
        if response.ok:
            return response.raw
        else:
            return response

    def get_song_art(self):
        """Creates an in memory image object from the image file stored at 
        the `url_image` location.
        
        Returns
        -------
        Image
            An image object.
        """
        response = requests.get(self.url_image)
        if response.ok:
            img_bytes = BytesIO(response.content)
            image = Image.open(img_bytes)
            return image

    def download_mp3(self, destination=None):
        # where will this file be saved?
        path = pathlib.Path(
            destination) if destination else pathlib.Path().cwd()
        filename = self.url_mp3.split('/')[-1] 

        # download and save the file
        response = requests.get(self.url_mp3)
        if response.ok:
            with open(filename, 'wb') as f:
                f.write(response.content)
            return f"Download of {self.title} complete"
        else:
            return response
