#!/bin/bash

#build the project 
echo "Building the enviroment"
python3.11 -m  pip install -r requirements.txt

echo "make migration...."
python3.11 manage.py makemigrations --noinput
python3.11 manage.py migrate --noinput


echo " collect static"
python3.11 manage.py collectstatic --noinput --clear