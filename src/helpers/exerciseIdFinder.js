const findExerciseId = (exerciseName) => {
  return allExercisesWithIds[exerciseName]
}
export {findExerciseId}

const allExercisesWithIds = {
  "2 Handed Kettlebell Swing": 1,
  "Axe Hold": 2,
  "Arnold Shoulder Press": 3,
  "Barbell Hack Squats": 4,
  "Barbell Ab Rollout": 5,
  "Bear Walk": 6,
  "Barbell Lunges": 7,
  "Barbell Triceps Extension": 8,
  "Benchpress Dumbbells": 10,
  "Bench Press Narrow Grip": 12,
  "Bent-over Lateral Raises": 13,
  "Bent Over Barbell Row": 14,
  "Bentover Dumbbell Rows": 15,
  "Bent Over Rowing": 16,
  "Bent Over Rowing Reverse": 17,
  "Biceps Curls With Barbell": 18,
  "Biceps Curl With Cable": 19,
  "Biceps Curls With SZ-bar": 22,
  "Body-Ups": 20,
  "Burpees": 24,
  "Cable Cross-over": 28,
  "Close-grip Lat Pull Down": 36,
  "Deadhang": 41,
  "Decline Pushups": 46,
  "Dumbbell Concentration Curl": 51,
  "Dumbbells on Scott Machine": 56,
  "Fly With Cable": 61,
  "Front Raises": 66,
  "Hammercurls on Cable": 71,
  "High Knee Jumps": 76,
  "Hyperextensions": 81,
  "Incline Plank With Alternate Floor Touch": 86,
  "Lateral Raises": 91,
  "Leg Curls (laying)": 96,
  "Leg Presses (wide)": 101,
  "Leverage Machine Chest Press": 106,
  "Military Press": 111,
  "Overhand Cable Curl": 116,
  "Pike Push Ups": 121,
  "Prone Scapular Retraction - Arms at Side": 126,
  "Rear Delt Raises": 131,
  "Biceps Curls With Dumbbell": 21,
  "Butterfly": 26,
  "Cable Woodchoppers": 31,
  "Close-grip Bench Press": 35,
  "Crunches With Legs Up": 39,
  "Decline Bench Press Barbell": 44,
  "Deficit Deadlift": 47,
  "Dumbbell Lunges Walking": 54,
  "Facepull": 59,
  "Fly With Dumbbells, Decline Bench": 63,
  "Full Sit Outs": 69,
  "Hammercurls": 72,
  "High Knees": 78,
  "Incline Bench Press": 83,
  "Kettlebell Swings": 88,
  "Ring Dips": 136,
  "Braced Squat": 23,
  "Cable External Rotation": 30,
  "Chin-ups": 33,
  "Crunches": 38,
  "Crunches on Machine": 42,
  "Diagonal Shoulder Press": 48,
  "Dumbbell Incline Curl": 52,
  "Flutter Kicks": 58,
  "French Press (skullcrusher) Dumbbells": 64,
  "Front Squats": 68,
  "Hanging Leg Raises": 73,
  "Hip Raise, Lying": 79,
  "Incline Dumbbell Flye": 82,
  "Incline Pushups": 87,
  "Lateral Raises on Cable, One Armed": 94,
  "Leg Extension": 99,
  "Leverage Machine Iso Row": 105,
  "Low Box Squat - Wide Stance": 110,
  "MGM Machine": 115,
  "Pendelay Rows": 119,
  "Preacher Curls": 125,
  "Push Press": 129,
  "Reverse Bar Curl": 135,
  "Romanian Deadlift": 140,
  "Seated Triceps Press": 145,
  "Bulgarian Split Squat": 25,
  "Butterfly Reverse": 29,
  "Calf Raises on Hackenschmitt Machine": 34,
  "Crunches With Cable": 40,
  "Decline Bench Press Dumbbell": 45,
  "Dips Between Two Benches": 50,
  "Dumbbell Lunges Standing": 55,
  "Dumbbell Triceps Extension": 60,
  "French Press (skullcrusher) SZ-bar": 65,
  "Glute Bridge": 70,
  "Hercules Pillars": 75,
  "Hollow Hold": 80,
  "Incline Dumbbell Press": 85,
  "Isometric Wipers": 89,
  "Lat Pull Down (Straight Back)": 93,
  "Leg Presses (narrow)": 100,
  "Leg Raises, Lying": 104,
  "L Hold": 108,
  // "Military Press": 113,
  "Overhead Squat": 118,
  "Plank": 123,
  "Pull Ups on Machine": 128,
  "Rack Deadlift": 132,
  "Roman Chair": 137,
  "Run - Interval Training ": 144,
  "Butterfly Narrow Grip": 27,
  "Calf Press Using Leg Press Machine": 32,
  "Cross-Bench Dumbbell Pullovers": 37,
  "Deadlifts": 43,
  "Dips": 49,
  "Dumbbell Goblet Squat": 53,
  "Extenseurs - Face": 57,
  "Fly With Dumbbells": 62,
  "Good Mornings": 67,
  "Hand Grip": 74,
  "High Pull": 77,
  "Incline Dumbbell Row": 84,
  "Jogging": 90,
  "Lat Pull Down (Leaning Back)": 95,
  "Leg Curls (standing)": 98,
  "Leg Raises, Standing": 103,
  "Long-Pulley, Narrow": 107,
  "Lying Rotator Cuff Exercise": 112,
  "Pause Bench": 117,
  "Pistol Squat": 122,
  "Pull-ups": 127,
  "Reverse Grip Bench Press": 133,
  "Rowing, Seated": 141,
  "Shoulder Press, on Machine": 149,
  "Lateral-to-Front Raises": 92,
  "Leg Curls (sitting)": 97,
  "Leg Press on Hackenschmidt Machine": 102,
  "Long-Pulley (low Row)": 109,
  "Negative Crunches": 114,
  "Perfect Push Up": 120,
  "Power Clean": 124,
  "Push Ups": 130,
  "Reverse Plank": 134,
  "Rowing, Lying on Bench": 139,
  "Run": 143,
  "Shoulder Press, Barbell": 147,
  "Side Crunch": 152,
  "Side Plank": 157,
  "Skipping - Standard": 163,
  "Squats": 167,
  "Stationary Bike": 171,
  "Triceps Dips": 176,
  "Triceps Extensions on Cable With Bar": 181,
  "Upper Body": 186,
  "Upright Row, SZ-bar": 191,
  "Weighted Step-ups": 196,
  "Rowing, T-bar": 138,
  "Run - Treadmill": 142,
  "Shoulder Press, Dumbbells": 148,
  "Shrugs, Dumbbells": 153,
  "Side to Side Push Ups": 158,
  "Smith Machine Close-grip Bench Press": 162,
  "Squat Jumps": 166,
  "Straight-arm Pull Down (bar Attachment)": 173,
  "Thruster": 178,
  "Trunk Rotation With Cable ": 183,
  "Upright Row, on Multi Press": 188,
  "Wall Pushup": 193,
  "Z Curls": 198,
  "Bench Press": 199,
  "Shotgun Row": 146,
  "Shrugs, Barbells": 151,
  "Side-lying External Rotation": 156,
  "Sit-ups": 161,
  "Standing Calf Raises": 168,
  "Stiff-legged Deadlifts": 172,
  "Triceps Bench Press One Barbell": 177,
  "Triceps Machine": 182,
  "Upper External Oblique": 187,
  "Wall Handstand": 192,
  "Wide-grip Pulldown": 197,
  "Shoulder Press, on Multi Press": 150,
  "Side Dumbbell Trunk Flexion": 154,
  "Single-arm Preacher Curl": 159,
  "Snach": 164,
  "Standing Rope Forearm": 170,
  "Superman": 175,
  "Triceps Extensions on Cable": 180,
  "Underhand Lat Pull Down": 185,
  "Upright Row w/ Dumbbells": 190,
  "Wall Squat": 195,
  "Side Raise": 155,
  "Sitting Calf Raises": 160,
  "Splinter Sit-ups": 165,
  "Speed Deadlift": 169,
  "Straight-arm Pull Down (rope Attachment)": 174,
  "Tricep Dumbbell Kickback": 179,
  "Turkish Get-Up": 184,
  "V-Bar Pulldown": 189,
  "Weighted Step": 194
}
