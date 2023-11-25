#!/usr/bin/python3

import socket

# Creating the socket object
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# AF_INET -> IPv4
# SOCK_STREAM -> connection based protocol (TCP)

# host = "192.168.1.103"
host = socket.gethostname()   # Host is the server IP
# If gethostbyname() runs in Windows, it may not get the correct IP belonging to the subnet
port = 444                      # Port to listen on

# Binding to socket
serversocket.bind((host, port)) # Host will be replaced/substitued with IP, if changed and not running on host

# Starting TCP listener
serversocket.listen(3)  # listen for max 3 connections


while True:
    # Starting the connection
    clientsocket, address = serversocket.accept()

    print(address)
    print("Received connection from " , str(address))

    # Message sent to client after successful connection
    message = "Hello! Thank you for connecting to the server" + "\r\n"
    clientsocket.send(message.encode("ascii"))

    # Close client socket
    clientsocket.close()
