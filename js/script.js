$(document).ready(function(){
	// DOM MANIPULATION
	let avatar = $('#avatar'),
		name   = $('.card-title'),
		gitprof= $('#demo'),
		followers = $('.followers'),
		following = $('.following'),
		company   = $('.company'),
		gists     = $('.gists'),
		blog      = $('.blog'),
		repos 	  = $('.repos');
		memberSince = $('register_date');
	$('#username').on('keyup', function(e){
		let username = e.target.value;
		$.ajax({
			url:"https://api.github.com/users/" + username,
			data:{
				client_id:"688412be3d1d57c2b5c9",
				client_secret:'6d56d44db13edd663afe0ca0847d17bd2206d8f9'
			},
			sort:'created :asc'
		}).done(function(user){
			$.ajax({
				url:"https://api.github.com/users/" + username + "/repos",
				data:{
					client_id:"688412be3d1d57c2b5c9",
					client_secret:'6d56d44db13edd663afe0ca0847d17bd2206d8f9'
				}
			}).done(function(repos){
				console.log(repos);
				let output = "";
				for(let repo of repos){
					output += `
						<div class="card-panel repo z">
							<div class="row">
								<div class="col s6">
									<strong>${repo.name}</strong>
									<small> ${repo.description}</small>
								</div>
								<div class="col s3">
									<a class="waves-effect waves-light btn">${repo.forks_count}</a>
									<a class="waves-effect waves-light btn">${repo.watchers_count}</a>
									<a class="waves-effect waves-light btn">${repo.stargazers_count}</a>								
								</div>
								<div class="col s3">
									<a class="waves-effect waves-light btn" target="_blank" href=${repo.html_url}>Demo</a>
								</div>
							</div>
						</div>
					`;
				}
				$(".repos").html(output);
			});
			console.log(user);
			console.log(user.login);
			avatar.attr("src" , user.avatar_url);
			/*name.textContent     += user.login;
			gitprof.attr('href', user.html_url);
			repos.textContent    += user.public_repos;
			gists.textContent    += user.public_gists;
			followers.textContent += user.followers;
			following.textContent+= user.following;
			company.textContent  += user.company;
			blog.textContent     += user.blog;
			location.textContent += user.location;
			memberSince.textContent += user.created_at;*/

			$("#profile").html(
			`<div class="row">
			<div class="col s12 m6">
				<div class="card profile">
			        <div class="card-image">
			          <span class="card-title">${user.login}</span>
			          <img id="avatar" src="${user.avatar_url}">
			        </div>
			       <a id="demo" target="_blank" class=" btn-floating halfway-fab waves-effect waves-light cyan" href="${user.html_url}">View Profile</a>
			      </div>
			</div>
			<div class="col s12 m6">
				<div>
					<a class="waves-effect waves-light btn">repos ${user.public_repos}</a>
					<a class="waves-effect waves-light btn gists">gists ${user.public_gists}</a>
					<a class="waves-effect waves-light btn followers">followers ${user.followers}</a>
					<a class="waves-effect waves-light btn following">following ${user.following}</a>
				</div>
				<ul class="collection">
			      <li class="collection-item active company">Company : ${user.company}</li>
			      <li class="collection-item blog">Blog : ${user.blog}</li>
			      <li class="collection-item location">Location : ${user.location}</li>
			      <li class="collection-item register_date">Member Since : ${user.created_at} </li>
			    </ul>
			</div>
		</div>`);
		})/*.fails(function(user){
			$('body').append('somthing went wrong');
		});*/
	});
});