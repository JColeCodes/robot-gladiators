var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
};

var fight = function(enemy) {
    // Repeat and execute as long as enemy robot is alive
    while (playerInfo.health > 0 && enemy.health > 0) {

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
                window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye!");
                // Subtract money from playerInfo.money
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }
        
        // Subtract playerInfo.attack from enemy Health
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

        // Check enemy health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            playerInfo.money = playerInfo.money + 20;
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // Subtract enemy.attack from playerInfo.health
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

        // Check player health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

var startGame = function() {
    // Reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);

            // If we're not the last enemy
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
};

var endGame = function() { // Thanos snap!
    window.alert("The game has now ended. Let's see how you did!");

    // If you live, you win
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You have a score of " + playerInfo.money + ".");
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
};

var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    // Ignore capitalization from input
    if (shopOptionPrompt != null) shopOptionPrompt = shopOptionPrompt.toUpperCase();

    switch (shopOptionPrompt) {
        case "REFILL":
            playerInfo.refillHealth();
            break;

        case "UPGRADE":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE":
            window.alert("Leaving the store.");
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

// Player Information
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You do not have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -=7;
        } else {
            window.alert("You do not have enough money!");
        }
    }
};

// Enemy Information
var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// Start game on page load
startGame();