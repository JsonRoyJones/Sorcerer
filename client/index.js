import { token } from './token.js';

const searchBtn = document.getElementById('searchRepos');
// const btnRepos = document.getElementById('btnRepos');
// const btnIssues = document.getElementById('btnIssues');
// const btnIssuesPrivate = document.getElementById('btnIssuesPrivate');
// const btnCreateIssue = document.getElementById('btnCreateIssue');
// const btnCommits = document.getElementById('btnCommits');
// const divResult = document.getElementById('divResult');
searchBtn.addEventListener('click', searchRepos);
// btnRepos.addEventListener('click', getRepos);
// btnIssuesPrivate.addEventListener('click', getIssuesPrivate);
// btnCreateIssue.addEventListener('click', createIssue);
// btnCommits.addEventListener('click', e => getCommits());

async function searchRepos() {
  clear();
  // still need to modularize these search parameters for query string
  // add minStars variable for use in url string
  // add maxStars variable for use in url string
  // concat apiBaseRepo, minStars, maxStars
  const minStars = document.getElementById('minStars').value;
  const maxStars = document.getElementById('maxStars').value;
  const starsQ = 'q=stars:';
  const apiBaseRepo = 'https://api.github.com/search/repositories?';
  const repoStars = apiBaseRepo + starsQ + minStars + '..' + maxStars;
  const response = await fetch(repoStars);
  const result = await response.json();
  result.items.forEach(i => {
    console.log(i);
    const div = document.createElement('div');
    div.id = i.name;
    const img = document.createElement('img');
    img.src = i.owner.avatar_url;
    img.style.width = '100px';
    img.style.height = '100px';
    const openIssues = document.createElement('p');
    openIssues.textContent = `Currently ${i.open_issues_count} open issues`;
    const anchor = document.createElement('a');
    anchor.href = i.html_url;
    anchor.textContent = i.name;
    divResult.appendChild(div);
    div.appendChild(anchor);
    div.appendChild(document.createElement('br'));
    div.appendChild(img);
    div.appendChild(openIssues);
    // div.appendChild(document.createElement('br'));
    // appending getIssues buttons to each i returned
    div.appendChild(document.createElement('button'));
    div.lastChild.setAttribute('id', `${i.name}_Issues`);

    let curBtn;
    curBtn = document.getElementById(`${i.name}_Issues`);
    console.log(curBtn);
    curBtn.textContent = `Get Issues`;
    curBtn.addEventListener('click', () => {
      console.log(i);
      let brTag = document.createElement('br');
      let btnParent = document.getElementById(i.name);
      btnParent.appendChild(brTag);
      getIssues(i.full_name);
    });

    // div.appendChild(document.createElement('hr'));
    // getCommits button for each i
    // divResult.appendChild(document.createElement('button'));
    // divResult.lastChild.setAttribute('id', `${i.name}_Commits`);
    // curBtn = document.getElementById(`${i.name}_Commits`);
    // curBtn.textContent = `Get Commits`;
    divResult.appendChild(document.createElement('hr'));
    divResult.appendChild(document.createElement('br'));
  });
}

async function saveIssues() {
  // create reset button to collapse repos
  const url = 'https://api.github.com/search/issues?q=repo:' + repo + ' type:issue state:open';
  const response = await fetch(url);
  const result = await response.json();
  // select div for issues
  const name = repo.split('/')[1];
  const issues = document.getElementById(name);
}

async function getIssues(repo) {
  // create reset button to collapse repos
  const url = 'https://api.github.com/search/issues?q=repo:' + repo + ' type:issue state:open';
  const response = await fetch(url);
  const result = await response.json();
  // select div for issues
  const name = repo.split('/')[1];
  const issues = document.getElementById(name);
  if (result.items.length < 1) {
    const noResults = document.createElement('p');
    noResults.innerText =
      "No issues available. It's likely that issues just aren't being shared by this repo.";
    issues.appendChild(noResults);
  } else {
    {
      /* <form action="//localhostwww.html.am/html-codes/forms/html-form-tag-action.cfm" target="result" method="get">
<p>What would you like for lunch?</p>
<input type="checkbox" name="issue" value="${el.title"> Apple
<input type="checkbox" name="fruit" value="Orange"> Orange 
<input type="checkbox" name="fruit" value="Banana"> Banana 
<p><input type="submit" value="Save Issues"></p>
</form>
<h3>Result:</h3>
<iframe name="result" style="height:100px;width:200px;"></iframe> */
    }
    // create form element for issues
    const issuesForm = document.createElement('form');
    issuesForm.action = '/Sourcerer/client/issues.html';
    issuesForm.target = 'result';
    issuesForm.method = 'post';

    // create submit button INPUT
    const saveIssues = document.createElement('input');
    saveIssues.type = 'submit';
    saveIssues.value = `Save ${name} Issues`;
    // saveIssues.onsubmit = ""

    // append form element to issues div
    issues.appendChild(issuesForm);

    result.items.forEach(el => {
      console.log('in result.items.forEach', el.user.avatar_url);
      // checkbox and attributes
      console.log(el);
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.name = el.title;
      box.value = el.html_url;
      // img icon and attributes
      const img = document.createElement('img');
      img.src = el.user.avatar_url;
      img.style.width = '32px';
      img.style.height = '32px';
      // anchor element and attributes
      const anchor = document.createElement('a');
      anchor.href = el.html_url;
      anchor.textContent = el.title;
      // appending child nodes to issues element
      issuesForm.appendChild(box);
      issuesForm.appendChild(img);
      issuesForm.appendChild(anchor);
      issuesForm.appendChild(document.createElement('br'));
    });
    // append submit button to issuesForm
    issuesForm.appendChild(saveIssues);
  }
}

// async function getIssues() {
//   clear();
//   // still need to add modular repo selection
//   const url = 'https://api.github.com/search/issues?q=repo:freecodecamp/freecodecamp type:issue';
//   const response = await fetch(url);
//   const result = await response.json();

//   result.items.forEach(i => {
//     console.log(i);
//     const anchor = document.createElement('a');
//     anchor.href = i.html_url;
//     anchor.textContent = i.title;
//     divResult.appendChild(anchor);
//     divResult.appendChild(document.createElement('br'));
//   });
// }

async function getIssuesPrivate() {
  clear();
  const url =
    'https://api.github.com/search/issues?q=repo:jsonroyjones/sourcerer type:issue state:open';
  const response = await fetch(url);
  const result = await response.json();

  result.items.forEach(i => {
    console.log(i);
    const anchor = document.createElement('a');
    anchor.href = i.html_url;
    anchor.textContent = i.title;
    divResult.appendChild(anchor);
    divResult.appendChild(document.createElement('br'));
  });
}

async function getCommits(
  // still need to modularize this function for multiple search parameters
  url = 'https://api.github.com/search/commits?q=test repo:freecodecamp/freecodecamp author-date:2018-03-01..2019-03-31'
) {
  clear();

  const headers = {
    Accept: 'application/vnd.github.cloak-preview'
  };
  const response = await fetch(url, {
    method: 'GET',
    headers: headers
  });

  const link = response.headers.get('link');
  const links = link.split(',');
  const urls = links.map(a => {
    return {
      url: a
        .split(';')[0]
        .replace('<', '')
        .replace('>', ''),
      title: a.split(';')[1]
    };
  });
  const result = await response.json();

  result.items.forEach(i => {
    console.log(i);
    const img = document.createElement('img');
    img.src = i.author.avatar_url;
    img.style.width = '32px';
    img.style.height = '32px';
    const anchor = document.createElement('a');
    anchor.href = i.html_url;
    anchor.textContent = i.commit.message.substr(0, 60) + '...';
    divResult.appendChild(img);
    divResult.appendChild(anchor);
    divResult.appendChild(document.createElement('br'));
  });

  urls.forEach(u => {
    const btn = document.createElement('button');
    btn.textContent = u.title.split('"')[1];
    btn.addEventListener('click', e => getCommits(u.url));
    divResult.appendChild(btn);
  });
}

async function createIssue() {
  clear();
  // still need to add modular repo selection
  const url = 'https://api.github.com/repos/jsonroyjones/sourcerer/issues';
  const headers = {
    Authorization: token.auth
  };
  const payload = {
    title: 'Testing the create issue',
    body: 'works'
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  });
  const result = await response.json();

  const i = result;
  console.log(i);
  const anchor = document.createElement('a');
  anchor.href = i.html_url;
  anchor.textContent = i.title;
  divResult.appendChild(anchor);
  divResult.appendChild(document.createElement('br'));
}

function clear() {
  while (divResult.firstChild) divResult.removeChild(divResult.firstChild);
}
