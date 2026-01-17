function Vehicle(speed, color) {
  Object.defineProperty(this, "speed", {
    value: speed,
    configurable: true,
    enumerable: true,
    writable: true,
  });
  Object.defineProperty(this, "color", {
    value: color,
    configurable: true,
    enumerable: true,
    writable: true,
  });
}

Vehicle.prototype.turnLeft = function () {
  console.log("Vehicle.turnLeft");
};

Vehicle.prototype.turnRight = function () {
  console.log("Vehicle.turnRight");
};

Vehicle.prototype.start = function () {
  console.log("Vehicle.start");
  return true;
};

Vehicle.prototype.stop = function () {
  console.log("Vehicle.stop");
  return true;
};

Vehicle.prototype.goBackward = function (speed, accel) {
  console.log("Vehicle.goBackward");
};

Vehicle.prototype.goForward = function (speed, accel) {
  console.log("Vehicle.goForward");
};

function Bicycle(speed, color) {
  Vehicle.call(this, speed, color);
}

Bicycle.prototype = Object.create(Vehicle.prototype);
Bicycle.prototype.constructor = Bicycle;

Bicycle.prototype.ringBell = function () {
  console.log("Bicycle.ringBell");
};

function MotorVehicle(speed, color, sizeOfEngine, licencePlate) {
  Vehicle.call(this, speed, color);
  Object.defineProperty(this, "color", {
    value: color,
    configurable: true,
    enumerable: true,
    writable: true,
  });
  Object.defineProperties(this, {
    sizeOfEngine: {
      value: sizeOfEngine,
      configurable: true,
      enumerable: true,
      writable: true,
    },
    licencePlate: {
      value: licencePlate,
      configurable: true,
      enumerable: true,
      writable: true,
    },
  });
}

MotorVehicle.prototype = Object.create(Vehicle.prototype);
MotorVehicle.prototype.constructor = MotorVehicle;

MotorVehicle.prototype.getSizeOfEngine = function () {
  console.log("MotorVehicle.getSizeOfEngine");
};

MotorVehicle.prototype.getLicensePlate = function () {
  console.log("MotorVehicle.getLicensePlate");
};

function Car(
  speed,
  color,
  sizeOfEngine,
  licencePlate,
  numOfDoors,
  numWheels,
  weight
) {
  MotorVehicle.call(this, speed, color, sizeOfEngine, licencePlate);

  Object.defineProperties(this, {
    numOfDoors: {
      value: numOfDoors,
      writable: true,
      enumerable: true,
      configurable: true,
    },
    numWheels: {
      value: numWheels,
      writable: true,
      enumerable: true,
      configurable: true,
    },
    weight: {
      value: weight,
      writable: true,
      enumerable: true,
      configurable: true,
    },
  });
}

Car.prototype = Object.create(MotorVehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.switchOnAirCon = function () {
  console.log("Car.switchOnAirCon");
};

Car.prototype.getNumOfDoors = function () {
  console.log("Car.getNumOfDoors");
};

function DumpTruck(
  speed,
  color,
  sizeOfEngine,
  licencePlate,
  loadCapacity,
  numWheels,
  weight
) {
  MotorVehicle.call(this, speed, color, sizeOfEngine, licencePlate);

  Object.defineProperties(this, {
    loadCapacity: {
      value: loadCapacity,
      writable: true,
      enumerable: true,
      configurable: true,
    },
    numWheels: {
      value: numWheels,
      writable: true,
      enumerable: true,
      configurable: true,
    },
    weight: {
      value: weight,
      writable: true,
      enumerable: true,
      configurable: true,
    },
  });
}

DumpTruck.prototype = Object.create(MotorVehicle.prototype);
DumpTruck.prototype.constructor = DumpTruck;

DumpTruck.prototype.lowerLoad = function () {
  console.log("DumpTruck.lowerLoad");
};

DumpTruck.prototype.raiseLoad = function () {
  console.log("DumpTruck.raiseLoad");
};

var car = new Car(120, "black", 2000, "ABC123", 4, 4, 1500);

for (var key in car) {
  console.log(key);
}
