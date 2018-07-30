export default ( desks, { building, floor, zone }  ) => {

    return desks.filter( ( desk ) => {

        const buildingMatch = building ? desk.buildingName === building : true;
        const floorMatch = floor ? desk.floorName === floor : true;
        const zoneMatch = zone ? desk.zonesName === zone : true;

        return buildingMatch && floorMatch && zoneMatch;
        
    });

};