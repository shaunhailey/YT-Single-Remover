# Remove Singles from the YouTube Music "New Albums" page, a Chrome Extension

This Chrome extension removes sections of HTML wrapped in the `<ytmusic-two-row-item-renderer>` element that contain the `<span class="style-scope yt-formatted-string">Single</span>` element. This is useful for filtering out singles from a list on the YT Music "New Albums" page.

## Features

- Automatically removes sections containing "Single" from the page.
- Simple to use with a single click.
- Lightweight and efficient.

## Installation

1. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/USERNAME/REPOSITORY.git
   ```

## Load the Extension in Chrome

Open Chrome and go to chrome://extensions/.
Enable "Developer mode" by toggling the switch in the top right corner.
Click on "Load unpacked" and select the directory containing your extension files.

## Use the Extension

Click on the extension icon in the Chrome toolbar.
Click the "Remove Singles" button in the popup (if you created the popup).
The script will run and remove the specified sections from the page.
