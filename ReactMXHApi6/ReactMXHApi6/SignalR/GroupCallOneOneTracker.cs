namespace ReactMXHApi6.SignalR
{
    public class GroupCallOneOneTracker
    {
        private static readonly Dictionary<string, List<string>> OnlineUsers = new Dictionary<string, List<string>>();

        public Task UserConnected(string groupName, string username)
        {
            lock (OnlineUsers)
            {
                if (OnlineUsers.ContainsKey(groupName))
                {
                    OnlineUsers[groupName].Add(username);
                }
                else
                {
                    OnlineUsers.Add(groupName, new List<string> { username });
                }
            }

            return Task.CompletedTask;
        }

        public Task UserDisconnected(string groupName, string username)
        {
            lock (OnlineUsers)
            {
                if (!OnlineUsers.ContainsKey(groupName)) return Task.CompletedTask;

                OnlineUsers[groupName].Remove(username);
                if (OnlineUsers[groupName].Count == 0)
                {
                    OnlineUsers.Remove(groupName);
                }
            }

            return Task.CompletedTask;
        }

        public Task<KeyValuePair<string, List<string>>> GetGroupOneToOne(string username)
        {
            KeyValuePair<string, List<string>> group;
            lock (OnlineUsers)
            {
                group = OnlineUsers.Where(x=>x.Key.Contains(username)).FirstOrDefault();                
            }

            return Task.FromResult(group);
        }
    }
}
