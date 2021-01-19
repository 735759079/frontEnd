---
title: js存储相关 
tags: cookie,session,localStorage,sessionStorage,token
grammar_cjkRuby: true
---


----------

 - cookie
	 - ==存储大小==`4-5KB`
	 - 一般是用来登陆验证，发送请求之后，服务端返回的响应头中设置Set-Cookie
	 - 遵循浏览器`同源策略`
	 - 分为会话期cookie（未设置过期时间）和持久性cookie，会话期cookie一般保存在内存中，设置了过期时间浏览器会把cookie保存在硬盘中
	 - cors跨域请求、fetch、ajax、axios，默认是不带cookie
	 - withCredentials，设置这个值，发送cros请求
	 - cookie的构成
		 - 名称
		 - 值
		 - 域
		 - 路径
		 - 失效时间
		 - 安全标志
 - session
 - localStorage
 - seesionStorage
 - token