const { google } = require('googleapis')
const nodemailer = require('nodemailer')

// function which replies with a "Vacation message" when there are unread messages 
const sendMail = async (oAuth2Client) => {

    // creating a new instance of the Gmail API client
    const gmail = google.gmail({version: 'v1', auth: oAuth2Client});

    const res = await gmail.users.messages.list({
        userId: 'me', 
        q: `is:unread`, // query to get unread mails
      });

    // getting messages
    const messages = res.data.messages;

    // checking whether there are unread messages or not 
    if(messages)
    {
        // iterating over unread messages
        for (const m of messages) {

            // getting message information
            const msg = await gmail.users.messages.get({
            userId: 'me',
            id: m.id
            });

            // getting from address from the message
            const fromMail = msg.data.payload.headers.find(
                (header) => header.name === "From"
              ).value;
            
            // gettign thread id
            const threadId = msg.data.threadId;

            // getting thread details
            const threadDetails = await gmail.users.threads.get({
                userId: "me",
                id: threadId,
              });

            // checking for prior replies and if there is no prior reply then we will send a message
            if(!threadDetails.data.messages.some((msg) =>
                    msg.payload.headers.find(
                    (header) =>
                        header.name === "From" &&
                        header.value.includes("notifierbot0@gmail.com")
                    )
                )
              )
              {            
                
                // creating a transporter with specified service and credentials
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      type: 'OAuth2',
                      user: process.env.MAIL_ID,
                      clientId: process.env.CLIENT_ID,
                      clientSecret: process.env.CLIENT_SECRET,
                      refreshToken: process.env.REFRESH_TOKEN,
                      accessToken: oAuth2Client.getAccessToken(),
                    }
                  });

                // content of the mail
                let mailOptions = {
                    from: process.env.MAIL_ID,
                    to: fromMail,
                    subject: 'On Vacation',
                    text: 'Hello there! I am in a vacation now.\n I will reach you soon..'
                  };

                // sending the mail
                await transporter.sendMail(mailOptions, async (err, data) => {
                    if (err) {
                      console.log("Error " + err); // displaying the error if any
                    } else {

                      console.log("Email sent successfully");

                      // our label
                      const labelName = "Vacation";

                        let label = null;
                        let labels = [];
                        let labelFound = false;

                        // Check whether the label already exists or not
                        gmail.users.labels
                        .list({
                          userId: "me",
                        }).then((res) => {

                            // fetching all labels
                            labels = res.data.labels;
                            labels.forEach((l) => {

                              // comparing  our label with current labels
                              if (l.name === labelName) {
                                console.log(`${labelName} label already exists`);
                                label = l;
                                labelFound = true;
                              }
                            });


                            // if label was not there then this will creates a new label
                            if (!labelFound) {
                                gmail.users.labels
                                  .create({
                                    userId: "me",
                                    requestBody: {
                                      name: labelName,
                                      labelListVisibility: "labelShow",
                                      messageListVisibility: "show",
                                    },
                                }).then((res) => {
                                    console.log(`"${labelName}" label created`);

                                    // adding message to the label
                                    gmail.users.threads
                                      .modify({
                                        userId: "me",
                                        id: threadId,
                                        resource: {
                                          addLabelIds: [label.id],
                                          removeLabelIds: ["UNREAD"], // removing this label it will not present in the list of Unread mails
                                        },
                                      })
                                      .then((res) => {
                                        console.log(`"${labelName}" label added to the conversation`);
                                      })
                                      .catch((err) => {
                                        console.log("couldn't add label", err);
                                      });
                                  }).catch((err) => {
                                    console.log("Error occured while creating label", err);
                                  });
                              } else {
                                // adding message to the label
                                gmail.users.messages
                                  .modify({
                                    userId: "me",
                                    id: m.id,
                                    resource: {
                                      addLabelIds: [label.id],
                                      removeLabelIds: ["UNREAD"],
                                    },
                                  })
                                  .then((res) => { 
                                    console.log(`"${labelName}" label added to the conversation`);
                                  })
                                  .catch((err) => {
                                    console.log("there was a problen while adding label", err);
                                  });
                              }
                            })
                            .catch((err) => {
                              console.log("Error occured while creating label ", err);
                            });
                        }
                        
                      });
                        
            }
            
        }
    }
    else{
        console.log("There are no unread messages in the mail box")
    }

}

module.exports = sendMail