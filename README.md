# Salvus

Salvus is a messaging platform with a bunch of fun little games I've developed over time, and some tools and resources I'd enjoy in my time of growth as a developer. Salvus is currently in closed beta for students at Akademiet Sundland, Viken, Norway.

### Developer notes (task list)

-   Use websockets for messaging, not reading from the JSON db upon request.
-   Make room-style/group-style messaging, rather than (only) the current "mail-type" one-to-one messaging
-   Possibly end-to-end encryption
-   Make a database for messages and rooms
-   Possibly change user database architecture
-   Possibly add a "pending_message" system so that a message is queued up for sending, and then sent once the connection is open.

### Further Notes

###### bcrypt@5.0.1 does not have the assets required for arm64 to run, so instead, I'm using the bcryptjs module for now
