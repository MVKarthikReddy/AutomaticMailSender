# AutomaticMailSender

```markdown
# Vacation Email Auto-Reply App

A Node.js-based app that automatically responds to emails sent to your Gmail mailbox while you're on vacation.

## Features

1. **Email Monitoring:** The app periodically checks for new emails in your Gmail inbox.
2. **Smart Auto-Reply:** It responds to emails that have no prior replies, ensuring that you only reply to the first email in a thread.
3. **Labeling:** After sending an auto-reply, the app adds a customizable label to the email and moves it to that label.
4. **Random Intervals:** The app repeats the process at random intervals between 45 and 120 seconds to simulate human behavior.

## Technical Details

- Built using Node.js and the Google API.
- Utilizes modern JavaScript features, such as `let` and `const`.
- Uses Promises and async/await for clean and readable code.

## Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/vacation-email-auto-reply.git
cd vacation-email-auto-reply
```

2. Install dependencies:

```bash
npm install
```

3. Configure the app by creating a `config.json` file and adding your Gmail API credentials.

4. Run the app:

```bash
node app.js
```

## Gmail API Setup

To use the app, you need to set up the Gmail API credentials. Follow these steps:

1. Visit the [Google Developers Console](https://console.developers.google.com/).
2. Create a new project.
3. Enable the Gmail API for your project.
4. Configure the OAuth consent screen with the necessary details.
5. Create OAuth 2.0 client credentials and download the JSON file.
6. Rename the downloaded JSON file to `credentials.json` and place it in the project directory.

## Usage

1. Run the app using the instructions in the Installation section.
2. The app will automatically monitor your Gmail inbox and reply to first-time emails from others.
3. Customize the auto-reply message and label in the code.

## Testing

To ensure proper functionality, you can use your own Gmail account to send test emails to yourself. The app should not send double replies to the same email thread.

## Areas for Improvement

- Error handling and logging can be enhanced for production use.
- Security should be considered for handling Gmail API credentials in a production environment.
- More customization options for auto-reply messages and labels.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This app was built using the [Google Gmail API](https://developers.google.com/gmail/api/guides).
- Special thanks to [Node.js](https://nodejs.org/) and [Google APIs](https://developers.google.com/apis-explorer) for their documentation and tools.

Feel free to contribute, report issues, or suggest improvements to this project.

Happy vacation!
```

Make sure to replace the placeholders (e.g., `https://github.com/your-username/vacation-email-auto-reply`) with the actual GitHub repository URL, customize the installation and usage instructions, and provide relevant links to resources.
