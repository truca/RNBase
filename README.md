use with Expo Develolment Enviroment (XDE)

##Branch Order
navigation
map
upload_images
notifications
sockets

##Image Uploading

For image upload, you will need a image handling server. This project is using 

[clanapp-image-upload](https://gitlab.com/ignacio.ureta/clanapp-image-upload)

###Development

For development, it uses ngrok to build a tunnel (the link changes, so you have to upload the link in profile)

###Production

In production, the link wont change, so you dont need to keep changing the link

##Notifications

The token will be printed in XDE. To test then you can use curl (change "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]" for the actual token):

````
curl -H "Content-Type: application/json" -X POST https://exp.host/--/api/v2/push/send -d '{
  "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "title":"hello",
  "body": "world"
}'
````

##Navigation

Added a service in services/navigator. Export it and use navigate to change routes from everywhere
