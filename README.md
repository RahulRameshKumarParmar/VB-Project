limitedUsers.map((user) => (
                <div className="flex items-center justify-between mt-4" key={user.id}>
                  <div className="flex items-center ">
                    {/* Image */}
                    <div className="flex items-end justify-center">
                      <img className="w-1/2" src={user?.image} alt={`${user?.firstName} image`} />
                    </div>
                    {/* User Details */}
                    <div className="flex flex-col gap-1">
                      <span>{user?.firstName + " " + user?.lastName}</span>
                      <span>{user?.email}</span>
                    </div>
                  </div>
                  {/* User Company */}
                  <div className="w-[14vw] md:w-[16vw] lg:w-[9vw] h-[5vh] truncate border border-gray-400 rounded-xl px-2">
                    {user?.company.name}
                  </div>
                </div>
              )
              ))