  import {test,expect, APIResponse} from '@playwright/test';

  test("api rate limit check",async({request})=>{
    const maxRequests=61;
    const responses:APIResponse[]=[];
    for(let i=0;i<maxRequests;i++){
      const response=await request.get("https://api.github.com/users/octocat");
      responses.push(response);
      console.log(`request ${i+1} status`,response.status());
    }
    const throttledresponses=responses.filter(resp=>resp.status()===429);
    console.log(`Total Throttled Requests: ${throttledresponses.length}`);
  });