module.exports = {
	up: (queryInterface) => queryInterface.bulkInsert('users', [
		{
			first_name: 'Benie Sereine',
			last_name: 'Mugwaneza',
			email: 'Benie@gmail.com',
			password:
          '$2b$10$YaouW1yQ1dwhk.OU0TdN0eoIjwcaaq03XzFL.oZnaiVVHFFpdSom.',
			gender: 'female',
			birth_date: '2002-10-10',
			location: 'Rwanda',
			isVerified: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			first_name: 'Benie Sereine',
			last_name: 'Mugwaneza',
			email: 'Benie1@gmail.com',
			password:
          '$2b$10$PDbtjPN6o4eqXIX/7yBZKuyeGCnHD7Z4J.P9rZvKCn8PsrmCx9GMK',
			gender: 'female',
			birth_date: '2002-10-10',
			location: 'Rwanda',
			isVerified: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]),
	down: (queryInterface) => queryInterface.bulkDelete('user', null, {}),
};
