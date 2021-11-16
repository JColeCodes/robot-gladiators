var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    // Repeat and execute as long as enemy robot is alive
    while (playerHealth > 0 && enemyHealth > 0) {

        // Do you want to fight?
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        // Ignore capitalization from input
        if (promptFight != null) promptFight = promptFight.toUpperCase();

        // If player picks to fight
        if (promptFight === "SKIP") {
            // Confirm if player wants to skip
            var confirmSkip = window.confirm("Are you sure you want to quit?");

            // If yes, leave fight. If no, ask by running fight again
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight. Goodbye!");
                // Subtract money from playerMoney
                playerMoney = math.Max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        
        // Subtract playerAttack from enemy Health
        var damage = randomNumber(playerAttack - 3, playerAttack);
        enemyHealth = Math.max(0, enemyHealth - damage);
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        // Check enemy health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract enemyAttack from playerHealth
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        playerHealth = Math.max(0, playerHealth - damage);
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

        // Check player health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
}

var startGame = function() {
    // Reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyName = enemyNames[i];
            enemyHealth = randomNumber(40, 60);
            fight(pickedEnemyName);

            // If we're not the last enemy
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                var storeConfirm = window.confirm("The fight is over. Visit the store before the next round?");
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game over.");
            break;
        }
    }

    // After loop ends, run endGame
    endGame();
}

var endGame = function() { // Thanos snap!
    // If you live, you win
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You have a score of " + playerMoney + ".");
    } else {
        window.alert("You have lost your robot in battle.");
    }

    // Would you like to play again?
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        // Let's go back, back to the beginning
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}

var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    // Ignore capitalization from input
    if (shopOptionPrompt != null) shopOptionPrompt = shopOptionPrompt.toUpperCase();

    switch (shopOptionPrompt) {
        case "REFILL":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You do not have enough money!");
            }
            break;

        case "UPGRADE":
            if (playerMoney >= 7) {
                window.alert("Refilling player's attack by 6 for 7 dollars.");
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You do not have enough money!");
            }
            break;

        case "LEAVE":
            window.alert("Leaving the store.");
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
}

// Start game on page load
startGame();