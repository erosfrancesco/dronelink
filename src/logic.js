// TODO: - Set heartbeat parser
/**
  Heartbeat: {
    system_status, autopilot, base_mode
  }

  0	MAV_STATE_UNINIT	Uninitialized system, state is unknown.
  1	MAV_STATE_BOOT	System is booting up.
  2	MAV_STATE_CALIBRATING	System is calibrating and not flight-ready.
  3	MAV_STATE_STANDBY	System is grounded and on standby. It can be launched any time.
  4	MAV_STATE_ACTIVE	System is active and might be already airborne. Motors are engaged.
  5	MAV_STATE_CRITICAL	System is in a non-normal flight mode (failsafe). It can however still navigate.
  6	MAV_STATE_EMERGENCY	System is in a non-normal flight mode (failsafe). It lost control over parts or over the whole airframe. It is in mayday and going down.
  7	MAV_STATE_POWEROFF	System just initialized its power-down sequence, will shut down now.
  8	MAV_STATE_FLIGHT_TERMINATION	System is terminating itself (failsafe or commanded).


  128	MAV_MODE_FLAG_SAFETY_ARMED	0b10000000 MAV safety set to armed. Motors are enabled / running / can start. Ready to fly. Additional note: this flag is to be ignore when sent in the command MAV_CMD_DO_SET_MODE and MAV_CMD_COMPONENT_ARM_DISARM shall be used instead. The flag can still be used to report the armed state.
  64	MAV_MODE_FLAG_MANUAL_INPUT_ENABLED	0b01000000 remote control input is enabled.
  32	MAV_MODE_FLAG_HIL_ENABLED	0b00100000 hardware in the loop simulation. All motors / actuators are blocked, but internal software is full operational.
  16	MAV_MODE_FLAG_STABILIZE_ENABLED	0b00010000 system stabilizes electronically its attitude (and optionally position). It needs however further control inputs to move around.
  8	MAV_MODE_FLAG_GUIDED_ENABLED	0b00001000 guided mode enabled, system flies waypoints / mission items.
  4	MAV_MODE_FLAG_AUTO_ENABLED	0b00000100 autonomous mode enabled, system finds its own goal positions. Guided flag can be set or not, depends on the actual implementation.
  2	MAV_MODE_FLAG_TEST_ENABLED	0b00000010 system has a test mode enabled. This flag is intended for temporary system tests and should not be used for stable implementations.
  1	MAV_MODE_FLAG_CUSTOM_MODE_ENABLED	0b00000001 Reserved for future use.
*/

// TODO: - Setup a parser for those numbers

/*

  1467022383 = 2*(0 / 1) + 4*(0 / 1) + 8*(0 / 1) + ... + 2147483648*(0 / 1)

  parsing n:
  (n - (n - (n - (n % 2)) % 4) ... % 2147483648 )

 SYS_STATUS {
  "onboardControlSensorsPresent":1467022383,
  "onboardControlSensorsEnabled":1382030383,
  "onboardControlSensorsHealth":1198562351,
  "load":323,
  "voltageBattery":26,
  "currentBattery":6,
  "batteryRemaining":99,
  "dropRateComm":0,
  "errorsComm":0,
  "errorsCount1":0,
  "errorsCount2":0,
  "errorsCount3":0,
  "errorsCount4":0,
  "onboardControlSensorsPresentExtended":0,
  "onboardControlSensorsEnabledExtended":0,
  "onboardControlSensorsHealthExtended":0}


  // 32 parameters
  1	MAV_SYS_STATUS_SENSOR_3D_GYRO	0x01 3D gyro
  2	MAV_SYS_STATUS_SENSOR_3D_ACCEL	0x02 3D accelerometer
  4	MAV_SYS_STATUS_SENSOR_3D_MAG	0x04 3D magnetometer
  8	MAV_SYS_STATUS_SENSOR_ABSOLUTE_PRESSURE	0x08 absolute pressure
  16	MAV_SYS_STATUS_SENSOR_DIFFERENTIAL_PRESSURE	0x10 differential pressure
  32	MAV_SYS_STATUS_SENSOR_GPS	0x20 GPS
  64	MAV_SYS_STATUS_SENSOR_OPTICAL_FLOW	0x40 optical flow
  128	MAV_SYS_STATUS_SENSOR_VISION_POSITION	0x80 computer vision position
  256	MAV_SYS_STATUS_SENSOR_LASER_POSITION	0x100 laser based position
  512	MAV_SYS_STATUS_SENSOR_EXTERNAL_GROUND_TRUTH	0x200 external ground truth (Vicon or Leica)
  1024	MAV_SYS_STATUS_SENSOR_ANGULAR_RATE_CONTROL	0x400 3D angular rate control
  2048	MAV_SYS_STATUS_SENSOR_ATTITUDE_STABILIZATION	0x800 attitude stabilization
  4096	MAV_SYS_STATUS_SENSOR_YAW_POSITION	0x1000 yaw position
  8192	MAV_SYS_STATUS_SENSOR_Z_ALTITUDE_CONTROL	0x2000 z/altitude control
  16384	MAV_SYS_STATUS_SENSOR_XY_POSITION_CONTROL	0x4000 x/y position control
  32768	MAV_SYS_STATUS_SENSOR_MOTOR_OUTPUTS	0x8000 motor outputs / control
  65536	MAV_SYS_STATUS_SENSOR_RC_RECEIVER	0x10000 RC receiver
  131072	MAV_SYS_STATUS_SENSOR_3D_GYRO2	0x20000 2nd 3D gyro
  262144	MAV_SYS_STATUS_SENSOR_3D_ACCEL2	0x40000 2nd 3D accelerometer
  524288	MAV_SYS_STATUS_SENSOR_3D_MAG2	0x80000 2nd 3D magnetometer
  1048576	MAV_SYS_STATUS_GEOFENCE	0x100000 geofence
  2097152	MAV_SYS_STATUS_AHRS	0x200000 AHRS subsystem health
  4194304	MAV_SYS_STATUS_TERRAIN	0x400000 Terrain subsystem health
  8388608	MAV_SYS_STATUS_REVERSE_MOTOR	0x800000 Motors are reversed
  16777216	MAV_SYS_STATUS_LOGGING	0x1000000 Logging
  33554432	MAV_SYS_STATUS_SENSOR_BATTERY	0x2000000 Battery
  67108864	MAV_SYS_STATUS_SENSOR_PROXIMITY	0x4000000 Proximity
  134217728	MAV_SYS_STATUS_SENSOR_SATCOM	0x8000000 Satellite Communication
  268435456	MAV_SYS_STATUS_PREARM_CHECK	0x10000000 pre-arm check status. Always healthy when armed
  536870912	MAV_SYS_STATUS_OBSTACLE_AVOIDANCE	0x20000000 Avoidance/collision prevention
  1073741824	MAV_SYS_STATUS_SENSOR_PROPULSION	0x40000000 propulsion (actuator, esc, motor or propellor)
  2147483648	MAV_SYS_STATUS_EXTENSION_USED	0x80000000 Extended bit-field are used for further sensor status bits (needs to be set in onboard_control_sensors_present only)
*/
