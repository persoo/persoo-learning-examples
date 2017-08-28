#!/bin/bash
grunt build
scp -r target/solutions root@persooweb2:/var/www/playground.persoo.cz
