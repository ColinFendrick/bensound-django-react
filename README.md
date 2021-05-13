# Music Player

## Requirements

1.) Node/npm (preferably npm < v7 due to lockfile changes in that version)
2.) Python3
3.) Pipenv

## Getting Started

1. Open two terminal windows
2. In the first, at the root of the app, `pipenv install`, then `pipenv shell`.
3. From the root, run `python setup.py` to create the environment file with a randomly generated secret key.
4. You will need to migrate: `python backend/manage.py migrate`.
5. Then `python backend/manage.py runserver`. This will run the backend on port 8000.
6. In the second window, `cd frontend`, then `npm i`.
7. After that is complete, `npm start`.
8. Go to `localhost:3000` and have fun!

![Spongebob](https://media.giphy.com/media/tqfS3mgQU28ko/giphy.gif)
