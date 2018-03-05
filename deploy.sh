#!/bin/bash
bx wsk action update download download.js --web true --param access_key "$access_key" --param secret_key "$secret_key" --param bucket "$bucket" --param endpoint "$endpoint"
url=`bx wsk action get download --url`
echo "$url"
