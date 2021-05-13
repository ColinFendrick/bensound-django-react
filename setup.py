import os
import random
import string


key = ''.join(random.choice(string.ascii_lowercase) for i in range(20))

os.system("echo \"SECRET_KEY=\'%s\'\" > backend/backend/environment.py" % (key))
