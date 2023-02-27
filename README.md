# Sudoku

Sudoku app built with React.

Sudoku is logic-based puzzle whose objective is to fill a 9 × 9 grid with digits 1 - 9 so that each column, row, and box contains no repeated values.

This app allows you to solve sudoku puzzles at different difficulties. You can challenge yourself and finish in the least amount of time and moves. If you win you can save your score on the leaderboard and if you are feeling competitive, you can also challenge a friend so they can try to break your record!

Visit [sudokupuzzless.com](https://www.sudokupuzzless.com/) to play now.

[![Netlify Status](https://api.netlify.com/api/v1/badges/5b5228d1-6040-4e0d-be1e-a74ba212dd5e/deploy-status)](https://app.netlify.com/sites/leasudokupuzzle/deploys)

<img alt="demo" src="demo.gif"/>

## Running Locally

Clone the repo

```
git clone https://github.com/LeanetAlfonso/sudoku
```

Change directory

```
cd sudoku
```

Install dependencies

```
yarn install
```

Add environment variable

```
touch .env
echo "REACT_APP_API_KEY={enter_api_key_here}
REACT_APP_AUTH_DOMAIN={enter_auth_domain_here}
REACT_APP_PROJECT_ID={enter_project_id_here}
REACT_APP_STORAGE_BUCKET={enter_storage_bucket_here}
REACT_APP_MESSAGING_SENDER_ID={enter_messaging_sender_id_here}
REACT_APP_APP_ID={enter_app_id_here}
REACT_APP_MEASUREMENT_ID={enter_measurement_id_here}" >> .env
```

Run app

```
yarn start
```

## Testing

Test app

```
yarn test
```
