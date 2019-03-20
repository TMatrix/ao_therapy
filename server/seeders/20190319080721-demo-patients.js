module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert('patients', [
			{
				name: 'Nick Northon',
				case: 454545,
				date: '14.2.2019',
				department: 'Cardio',
				sex: 'm',
				age: 33,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Vasya Pupkin',
				case: 334,
				date: '25.2.2019',
				department: 'Card',
				sex: 'm',
				age: 23,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Ddd ff',
				case: 675757,
				date: '13.2.2019',
				department: 'fgddg',
				sex: 'f',
				age: 44,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'John Doe',
				case: 66686786,
				date: '1.2.2019',
				department: 'Cardio',
				sex: 'f',
				age: 90,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Marta Polo',
				case: 122,
				date: '4.2.2019',
				department: 'Cardio',
				sex: 'm',
				age: 11,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Luka Lacky',
				case: 1111222,
				date: '8.2.2019',
				department: 'surg',
				sex: 'm',
				age: 34,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Mike Tyson',
				case: 123,
				date: '29.3.2019',
				department: 'Cdfd',
				sex: 'm',
				age: 22,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Mary Key',
				case: 123331,
				date: '10.12.1999',
				department: 'Sergury',
				sex: 'F',
				age: 44,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]),
	down: queryInterface => queryInterface.bulkDelete('patients', null)
};
