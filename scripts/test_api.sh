#!/bin/bash
# Requires python http installed
# pip install httpie

# Create user
http post http://anotode.herokuapp.com/api/users email=avi.aryan123@gmail.com password=test username=aviaryan -j
http post localhost:3000/api/users email=avi.aryan123+dsssa@gmail.com password=sadsass username="asadsadsfal" -j

# Login
http post localhost:3000/api/login email=avi.aryan123@gmail.com password=test -j
http post localhost:3000/api/login email=asd password=sads -j

# Get higlight
http get "localhost:3000/api/highlights?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2YxMWNlNDk1NDcxMDNkNDg5OTExYmIiLCJpYXQiOjE0NzU2MDI4MjF9.uk14DwEAwzbhckq48SP-b5ZtBIAmik079fgtsssQPzo"

# post highlight
http post "localhost:3000/api/highlights?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2YxMWNlNDk1NDcxMDNkNDg5OTExYmIiLCJpYXQiOjE0NzU2MDI4MjF9.uk14DwEAwzbhckq48SP-b5ZtBIAmik079fgtsssQPzo" text=abc title=def -j

http put "localhost:3000/api/highlights/57f3ea3f1e44661890c773c5?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2YxMWNlNDk1NDcxMDNkNDg5OTExYmIiLCJpYXQiOjE0NzU2MDI4MjF9.uk14DwEAwzbhckq48SP-b5ZtBIAmik079fgtsssQPzo" text=abc title=def category=mycat -j

http get http://anotode.herokuapp.com/api/highlights?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2Y1MDRkNTk5M2NiODAwMTI3ZDRjZjgiLCJpYXQiOjE0NzYzNDkwNjB9.OXXKmiiNKw3jQ8fn3GAAW6umpk0KCZbrzKiR6wtnKB8


http get "localhost:3000/api/highlights/categories?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2YxMWNlNDk1NDcxMDNkNDg5OTExYmIiLCJpYXQiOjE0Nzg3NzgwMTV9.fbmJ3BJFfAZ1Z41EzaZGFRohfBpp0KmaCaLtPpuCNRw"

http post "localhost:3000/api/login/forgot_password" email=avi.aryan123@gmail.com -j
