'use strict';
const Statuses = new Map();

function SetUpUsTheList()
{
	const items = document.getElementsByTagName("span");
	const cookie = getCookie('keksi');
	console.log(cookie);
	
	for (let i = 0; i < items.length; ++i)
	{
		const item = items[i];
		item.addEventListener('click', Vaihda);
		if ( i < cookie.length && cookie.charAt(i) == '1' )
			Statuses.set(item, item.classList.toggle('done', true));
		else
			Statuses.set(item, item.classList.toggle('done', false));
	}
}

function Vaihda(event)
{
	const item = event.target;
	Statuses.set(item, item.classList.toggle("done"));
	let cookie = "";
	for ( let [key, value] of Statuses )
		cookie += value ? '1' : '0';
	setCookie('keksi', cookie);
}

function setCookie(cname,cvalue)
{
	const d = new Date();
	d.setTime(d.getTime() + (24*60*60*1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; SameSite=None; Secure";
}

function getCookie(cname)
{
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++)
	{
		let c = ca[i];
		while (c.charAt(0) == ' ')
		{
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0)
		{
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
