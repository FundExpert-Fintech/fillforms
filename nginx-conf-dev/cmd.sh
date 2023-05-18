tag=`md5sum nginx.conf | cut -c1-10`
image=:$tag

test -z `docker images -q $image` && echo `creating docker image $image` && docker build -t $image .

echo starting container on port 8585 for image $image
docker run -p 8585:80 $image