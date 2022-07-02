using Microsoft.AspNetCore.SignalR;
using ReactMXHApi6.Core.Interfaces;
using ReactMXHApi6.Extensions;

namespace ReactMXHApi6.SignalR
{
    public class GroupVideoCallHub : Hub
    {
        private readonly GroupCallOneOneTracker _tracker;
        private readonly IUnitOfWork _unitOfWork;
        public GroupVideoCallHub(GroupCallOneOneTracker tracker, IUnitOfWork unitOfWork)
        {
            _tracker = tracker;
            _unitOfWork = unitOfWork;
        }

        public override async Task OnConnectedAsync()
        {
            var username = Context.User.GetUsername();

            var otherUser = Context.GetHttpContext().Request.Query["user"].ToString();

            var groupName = GetGroupName(username, otherUser);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await _tracker.UserConnected(groupName, username);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var username = Context.User.GetUsername();

            var group = await _tracker.GetGroupOneToOne(username);

            await _tracker.UserDisconnected(group.Key, username);

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, group.Key);

            await base.OnDisconnectedAsync(exception);
        }

        private string GetGroupName(string caller, string other)
        {
            var stringCompare = string.CompareOrdinal(caller, other) < 0;
            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }
    }
}
