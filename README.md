This is the Dynamic Pricing Game for BobaLabs

The frontend is a React App connected to a Firebase database for storing user entries and responses.

At the moment, the game currently takes inputs such as alphas, betas, signals, tips, and gammas through CSV files that can be uploaded to the code base.

Input sepereate CSV files for each value needed specifiying for the round and period number, and the corresponding values. After uploading the CSV files update the file paths in the code to represent the changes. Data should be uploaded to the data folder withing the src folder. Data should be in CSV format.

The program will automatically parse the CS's and use the data for running the simulation.

The user is provided with a unique session ID which they will input into the game, and they will be assigned different "types" based ont the session ID. Their gameplay will be different, and they will encounter different values depending on which type they are placed into.



To Play the Game:

Welcome to dynamic pricing game! You're the pricing manager for a company selling product A and B, and your ultimate goal is to make as much profit as possible.

You’ll have 1 practice round with 10 periods (i.e you have to decide product prices 10 times) and 1 real round with 30 periods. Only the real round influences your final earnings, and we highly suggest you get familiar with the game logistics through the practice round.

You will be given three graphs below, each one showing the historical trend of demand, profits, and prices you set. 

It is up to you to decide on prices for the two products, though your ultimate goal is to make as much profit as possible. To change the prices for each, slide the bar; to submit the prices, click "set prices." Feel free to use any information on the dashboard in your decision-making.
