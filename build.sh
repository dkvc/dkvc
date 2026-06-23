#!/bin/sh
BUILD_DATE=$(date -u "+%B %-d, %Y %H:%M UTC")
sed "s/{{BUILD_DATE}}/$BUILD_DATE/g" index.html.template > index.html
