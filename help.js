function createUser (name) {
    const discordName = "@" + name;
    return { name, discordName };
  }

const user1 = createUser("bob");

console.log(user1.name);