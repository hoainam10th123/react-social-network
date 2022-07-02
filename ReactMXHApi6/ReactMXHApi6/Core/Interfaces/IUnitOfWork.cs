namespace ReactMXHApi6.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        Task<bool> Complete();
        bool HasChanges();
        IUserRepository UserRepository { get; }
        IMessageRepository MessageRepository { get; }
    }
}
