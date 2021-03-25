const months = [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec",
  ];

const getAccumulator = () => {
    return getOrderedMonths(new Date().getMonth()).reduce((acc, month) => {
        return {
            [month]: [],
            ...acc
        }
    }, {});
};

const getOrderedMonths = (currentMonth) => {
    return months
        .slice(currentMonth)
        .concat(months.slice(0, currentMonth));
};

export const getOrderedPlayerNameDays = (players) => {
    ;
    return players.reduce(
        (acc, player) => {
            let [day, month] = player.nameDay.split(".");
            acc[months[month - 1]].push({
                primary: player.name,
                secondary: `${day}.${month}`
            });
            return acc;
        }, getAccumulator());
    
};

export const getOrderedPlayerBirthdays = (players) => {
    return players.reduce(
        (acc, player) => {
            acc[months[player.birth.getMonth()]].push({
                primary: player.name,
                secondary: `${player.birth.toLocaleDateString()} (${
                    getAge(player.birth) + 1
                  })`
            });
            return acc;
        }, getAccumulator());
};

export const getAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};