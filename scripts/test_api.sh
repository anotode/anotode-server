#!/bin/bash
# Requires python http installed
# pip install httpie

# Create user
http post localhost:3000/api/users email=asd password=sads -j

# Login
http post localhost:3000/api/login email=asd password=sads -j
