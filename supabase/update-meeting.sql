-- Change the meeting for all existing invitations to Tuesday 8:00 PM.
update invitations
set meeting_date = 'Tuesday',
    meeting_time = '8:00 PM';

select a.name, i.meeting_date, i.meeting_time
from invitations i
join applicants a on a.id = i.applicant_id
order by a.name;
