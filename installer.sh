#!/bin/bash

DIR='/usr/local/bin/';

printf '\n\n'
echo 'Fallout Terminal Installation:'
echo '------------------------------'
printf '\n'
echo 'installing...'
printf '\n'

echo 'checking for existing directory...'
if [ -d "$DIR" ]; then
	echo "installing config files in ${DIR}..."
else
	echo "creating directory ${DIR}..."
	mkdir $DIR
fi

echo 'moving files to installation path...'
mv $PWD $DIR
