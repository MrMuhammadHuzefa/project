#!/bin/bash

# List of directories
directories=(
    "/home/huzefa/project/blockchain-hyperledger-fabric-electronic-patient-records-main/app/client"
    "/home/huzefa/project/blockchain-hyperledger-fabric-electronic-patient-records-main/app/fabcar/javascript"
    "/home/huzefa/project/blockchain-hyperledger-fabric-electronic-patient-records-main/app/off_chain_data"
    "/home/huzefa/project/blockchain-hyperledger-fabric-electronic-patient-records-main/app/patient-asset-transfer/application-javascript"
    "/home/huzefa/project/blockchain-hyperledger-fabric-electronic-patient-records-main/app/server"
)

# Loop through each directory and run npm install
for dir in "${directories[@]}"; do
    if [ -d "$dir" ]; then
        echo "Running npm install in $dir"
        (cd "$dir" && npm install)
    else
        echo "Directory $dir does not exist, skipping..."
    fi
done