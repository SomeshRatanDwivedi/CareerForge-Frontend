Assumption

1. Every company need a unique slug for edit and career page.

2. Conceptually edit page should be open for their own company only.

3. In real system candidate should not be able to open edit page, but this is not emplemented in this assignment.

4. Since this is as simple assignment i can make it easy. I will not implement authentication and authorisation. Every one will be able to open both pages.

5. I have to generate unique slug of campany in backend side.

6. User can login with company name only. if that company is available already it will give the deatils of that company otherwise it create new company for simplicity. (In real app this is wrong).

7. Will not use any library for state management because the assignment is simple.(I have started with useState directly, after some time i realise i need context ap atleast)


Architecture

Frontend

1. Used React with Vite for ui.
2. Used Shadcn and materialUi for quick components.
3. Used Dnd for drag and drop of components.
4. Context api for state management.
5. The application have only two pages:
    Edit Page – used by companies to customize the careers page.
    Careers Page – public-facing page for candidates.

Backend

1. Used node with express for apis.
2. Authentication and authorization are not implemented for simpicity.

Databse
1. Used postgresql(supabase) for storing the data

Shema

There are 3 tables

1. companies
   Store the company name and slug

2. brand_themes
   Store the themes of company like colors, logo, banner image, and culture video URL. Its connected with companies table by company_id by column.

3. content_sections
   Store the content of company like About Us, Life at Company etc. Its also connected with companies table company_id column. 


4. jobs
   Store the job of company. column like (title, location, department, employment type etc.).
   In real application it should also connect with the companies but for simlicity i skipped this part. same job will be render for all companies. 


Test Plan

- Recruiter should be able to login with their company name. No need of signup if campany is not in db then it should new one.
- After login the edit page should be shown.
- If company is new edit section should be open with the empty data other wise it shoul show the correct company name , logo banner culturat video, breand colors and contents.
- Recruiter should be able to edit all the inputs.
- After editing recruiter should be able to see the career page in preview mode with the updated changes.
- After clicking on publish button all the changes should be saved and public career url should be open.




