#!/usr/bin/python3

import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(5)

host = input("Please enter the IP you want to scan: ")
port = int(input("Please enter the port you want to scan: "))


def portScanner(port):
    if s.connect_ex((host, port)):      #connect_ex() returns an error code while
        print("The port is closed")     #connect() raises an exception
    else:
        print("The port is open")

portScanner(port)
