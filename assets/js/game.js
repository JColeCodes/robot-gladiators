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
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        
        // Subtract playerAttack from enemy Health
        enemyHealth = enemyHealth - playerAttack;
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        // Check enemy health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract enemyAttack from playerHealth
        playerHealth = playerHealth - enemyAttack;
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

for (var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}