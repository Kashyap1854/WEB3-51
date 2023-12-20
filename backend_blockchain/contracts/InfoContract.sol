// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract InfoContract {
    event AddInfo(address recipient, uint infoId);
    event DeleteInfo(uint infoId, bool isDeleted);

    struct Info {
        uint id;
        string healthInfo;
        bool isDeleted;
    }

    Info[] private infos;

    mapping(uint => address) infoOwner;

    function addInfo(string memory healthInfo, bool isDeleted) external {
        uint infoId = infos.length;
        infos.push(Info(infoId, healthInfo, isDeleted));
        infoOwner[infoId] = msg.sender;
        emit AddInfo(msg.sender, infoId);
    }

    function getHealthInfo() external view returns (Info[] memory) {
        Info[] memory temp = new Info[](infos.length);
        uint count = 0;

        for (uint i = 0; i < infos.length; i++) {
            if (infoOwner[i] == msg.sender && infos[i].isDeleted == false) {
                temp[count] = infos[i];
                count++;
            }
        }
        Info[] memory result = new Info[](count);
        for (uint i = 0; i < count; i++) {
            result[i] = temp[i];
        }
        return result;
    }

    function deleteInfo(uint infoId, bool isDeleted) external {
        if (infoOwner[infoId] == msg.sender) {
            infos[infoId].isDeleted = true;
            emit DeleteInfo(infoId, isDeleted);
        }
    }
}
