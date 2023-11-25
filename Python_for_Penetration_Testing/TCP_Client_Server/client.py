#!/usr/bin/python3

import socket

# Create socket object
clientsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# host = "192.168.241.128"
host = socket.gethostname()

port = 444

clientsocket.connect((host, port))  # You can substitue the host with the server IP

message = clientsocket.recv(1024) # Maximum amound of data client accepts at once

clientsocket.close()

print(message.decode("ascii"))
