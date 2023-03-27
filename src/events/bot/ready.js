module.exports = async (client) => {
    const status = [
		'💓 Auto Buy: https://masewstore.xyz/ \n Discord: https://discord.gg/masewstore.',
	];
	i = 0;
	client.user.setActivity(status[0]);
	client.user.setStatus('online');
	console.log('😍 ' + client.user.username + ' started working!');
};