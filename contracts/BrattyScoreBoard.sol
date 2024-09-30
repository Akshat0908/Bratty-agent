pragma solidity ^0.8.0;

contract BrattyScoreBoard {
    mapping(address => uint256) public scores;
    mapping(address => string) public bratTitles;
    address[] public players;

    event NewBratTitle(address player, string title);

    function updateScore(uint256 _score) public {
        if (scores[msg.sender] == 0) {
            players.push(msg.sender);
        }
        scores[msg.sender] = _score;
        updateBratTitle(msg.sender);
    }

    function updateBratTitle(address player) internal {
        uint256 score = scores[player];
        string memory newTitle;

        if (score < 100) newTitle = "Novice Nuisance";
        else if (score < 500) newTitle = "Mischief Maker";
        else if (score < 1000) newTitle = "Troublemaker Supreme";
        else if (score < 5000) newTitle = "Chaos Connoisseur";
        else newTitle = "Ultimate Brat Lord";

        if (keccak256(bytes(bratTitles[player])) != keccak256(bytes(newTitle))) {
            bratTitles[player] = newTitle;
            emit NewBratTitle(player, newTitle);
        }
    }

    function getTopPlayers(uint256 _count) public view returns (address[] memory, uint256[] memory) {
        require(_count <= players.length, "Not enough players");
        
        address[] memory topPlayers = new address[](_count);
        uint256[] memory topScores = new uint256[](_count);
        uint256[] memory tempScores = new uint256[](players.length);

        // Copy scores to a temporary array
        for (uint256 i = 0; i < players.length; i++) {
            tempScores[i] = scores[players[i]];
        }

        for (uint256 i = 0; i < _count; i++) {
            uint256 highestScore = 0;
            uint256 highestScoreIndex = 0;

            for (uint256 j = 0; j < players.length; j++) {
                if (tempScores[j] > highestScore) {
                    highestScore = tempScores[j];
                    highestScoreIndex = j;
                }
            }

            topPlayers[i] = players[highestScoreIndex];
            topScores[i] = highestScore;
            tempScores[highestScoreIndex] = 0; // Set to 0 to find next highest
        }

        return (topPlayers, topScores);
    }
}