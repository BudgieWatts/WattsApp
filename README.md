# WattsApp

The AWS bits here are heavily based on the sample code provided by AWS.  I mean it's virtually the same but I added something extra.

The Angular stuff is my own random crap.

## (Probably) incomplete instructions on making this work

```shell
#> cd websockets
#> sam build
#> sam deploy --guided
```
Note the `WebSocketURI` output by the command and add the value to `src/environments/environments.ts`

Run `npm install` followed by `ng serve` in the root directory of the project and go to http://localhost:4200/

Alternatively Google how to serve a static website from an S3 bucket and run `ng build` and copy all the files in `dist/WattsApp` to your S3 bucket.

Yeah, it's stupidly easy to play with WebSockets.

`wscat -c wss://your-url.com` will allow you to send stuff directly to the API Gateway for debugging.

`> {"action":"sendmessage","data":"hello"}` // send
`< {"type":"message","content":"hello"}`    // response

`> {"action":"registername","data":"clancy"}` // send
`< {"type":"joined","name":"clancy"}`         // response

Are the only valid commands at the time of writing this README (because you know it's not getting updated regularly).

The API Gateway is set up to route requests based on the value of `action`.  See `websockets/template.yaml:25` (`RouteSelectionExpression: "$request.body.action"`).  `RouteKey` is where you specify what each value does.  I think there's also a default route where anything that doesn't match goes but you'd have to look that up.

*NOTE:* You'll probably have to deploy your API if you make changes - SAM will update the parts but it needs to be 'deployed' to make a difference.  Check the API/Stages section of the AWS Console and fiddle about.  Or just do a `sam delete && sam build && sam deploy`.  I wasted a whole evening getting annoyed because I couldn't work out what was wrong with my SAM template - the answer was nothing as it turned out.  Don't be like me.

As for the frontend part - that's mostly a mystery to me - it's baby's first Angular project and I wouldn't for a second claim to be a front end dev (as is clear from my UI).  Broadly speaking though, I register callbacks with the WebSocketsService and they're activated depending on the `type` of the incoming message.  So far they just push to an array and Angular does some magic.

On the lambda side, it's all about the connectionId and DynamoDB.  I suspect I'll eventually generate a UUID and store that in a cookie on the browser and send the contents in the outgoing messages and use that as a database key.  That way you can reconnect and it can pick your name up.

The whole thing is based on a broadcast paradigm. I thought I'd bookmarked a great looking blog post that used SQS and did a subscribe / push thing but I can't find it.
