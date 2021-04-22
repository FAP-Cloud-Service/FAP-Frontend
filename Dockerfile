FROM nginx:1.19.10-alpine
RUN rm -r /usr/share/nginx/html/*
COPY ./FriendsAndPlaces/dist/* /usr/share/nginx/html/
