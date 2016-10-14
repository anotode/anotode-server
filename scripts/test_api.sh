#!/bin/bash
# Requires python http installed
# pip install httpie

# Create user
http post localhost:3000/api/users email=asd password=sads -j
http post http://anotode.herokuapp.com/api/login email=asd@gmail.com password=sads -j

# Login
http post localhost:3000/api/login email=asd password=sads -j

# Get higlight
http get "localhost:3000/api/highlights?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2YxMWNlNDk1NDcxMDNkNDg5OTExYmIiLCJpYXQiOjE0NzU2MDI4MjF9.uk14DwEAwzbhckq48SP-b5ZtBIAmik079fgtsssQPzo"

# post highlight
http post "localhost:3000/api/highlights?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2YxMWNlNDk1NDcxMDNkNDg5OTExYmIiLCJpYXQiOjE0NzU2MDI4MjF9.uk14DwEAwzbhckq48SP-b5ZtBIAmik079fgtsssQPzo" text=abc title=def -j

http put "localhost:3000/api/highlights/57f3ea3f1e44661890c773c5?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2YxMWNlNDk1NDcxMDNkNDg5OTExYmIiLCJpYXQiOjE0NzU2MDI4MjF9.uk14DwEAwzbhckq48SP-b5ZtBIAmik079fgtsssQPzo" text=abc title=def category=mycat -j

http get http://anotode.herokuapp.com/api/highlights?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2Y1MDRkNTk5M2NiODAwMTI3ZDRjZjgiLCJpYXQiOjE0NzYzNDkwNjB9.OXXKmiiNKw3jQ8fn3GAAW6umpk0KCZbrzKiR6wtnKB8


