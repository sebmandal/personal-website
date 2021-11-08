# Salvus

Salvus has a login/registration system, a good database architecture, an admin panel, with a user and message database access, 2 factor authentication, and a socket-based live messaging system that save onto a JSON file for surveillance. User passwords are encrypted with bcrypt and more features will be coming soon. We also have a fun little game that has tonnes of potential for live-action gameplay with other users (totally not foreshadowing ;D)

### Developer notes (task list)

#### Long term

-   (maybe) Make room-style/group-style messaging, rather than (only) the current "mail-type" one-to-one messaging
-   Possibly end-to-end encryption
-   Possibly note in users' database when they log on, when they log off, etc. to gather statistics and retention rates

#### Short term (important)

-   Add a cooldown for 2FA and logins, and maybe chat as well
-   Add 2FA for registration
-   Finish fixing JSON storing logins and 2FA authorization, to move away from cookies.

### Further Notes

###### bcrypt@5.0.1 does not have the assets required for arm64 to run, so instead, I'm using the bcryptjs module for now
