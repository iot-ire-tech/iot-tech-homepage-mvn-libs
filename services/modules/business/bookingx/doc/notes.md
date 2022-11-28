# Usecase
# Business Owner
Has great assets, but needs to advertise them........

Primary Account: acct_1Fhwv2B2iGwtq5ly
## Physical Asset
Asset: Sports Hall 
SOL: Jan 2020
EOL: Jan 2030
Type: Physical / Role
Bizness: 7pm - 11pm 
Count: 1

On exit
* an email is sent out to all on the social distribution list or everybody!
* analytics is updated.


## Logical Asset (Sellable)
Alias : Basket Ball Court
Capacity: 1
Reveune Stream
Fee: 
% not possible, how to get a % of income? all booking costs...v. awkward.
or 
Flat : YEs
or 
Per Minute : Yes

Customer Availability: - Players 
Mon-Sunday: 6pm - 11pm 
Exceptions(1+)
* Xmas



# Business Consumers
## AccountHolder/Consumer: Basketball Ireland

Name: Basketball Biltz
Fee: Flat (100 Euros) .... as defined in asset space.
Mode: Event User
Bizness: 7-8
*Check is available
Cap
* 100
Cost: 
* Standing - 1
* Premier - 2
* Middle - 1.50

********************************************

Name: Basketball Practice
Mode: Activity
Mode: Activity User
Bizness: 7-8
* check is available
Cost 
* Guest free
* Reg 5 Euros






# Booking Module

#Database
[] move seating to db 

## UX
+ allow for tabs to be dynamically created.....
+ add new msg window to support event updates!
+ add stats footer supporting bookings capabilities!



# Activity and Booking
## Rules
[x] Check availability before allowing booking to start
[x] lookup  fixtures calender before booking an activity
[x] reservation only made when fixtures and business hours are met.

# Events Ux!
[x] Best prices as displayed price!!, and this to be tag in reveune stream builder
[] Add social media, and feeds

# Events Features!
[] Send email to business affialiates if they have no events registered!
acct_1FioH0KdHruxI3OT
acct_1FioHoJw9MKsV6s1
acct_1Fj0VcFz6LhyNMIs
[] Event clash, ensure events can schedules dont collide.

# Events By Resource!
Pin event to upstream resource
Check fixtures before allowing new event to be provisioned by admin
Check fixtures before allowing new activity booking to start by customer



# Booking
## UX
[] panel to appear slow in...

## Behaviour
Event driven?

- new event
+ add one or more dates to fixutures calander
+ lookup  fixutures calander booking an event

# Business Assets
[] Public available assets to be made available to other providers aka "whitelist_accountsholders"
## Reveue
as an asset, it is lent out, to event and activity users.... you can apply application fee as fitting...

## Dependency chain
Asset Availability 



# Concepts
## Inventory Management
Consider Coach philips - whats his inventory count!!! verus an event hall...
Need to provisioned as % stockLevels(unitRatio, inventoryRsp.units_lower / 100, inventoryRsp.units_upper / 100) 

## Revenue
Lease fees
[] events
[] activity
[] shop items (wholesalers)
how to make your mark up do we , what sort of billing do we offer
1. Mark item as free, and let parties handle between themselves
2. Apply %
2. Apply Timebased
* Flat rate
* Number of units
* Time period



## Time management
# Availability
Is its availablity to upstream / consumers, suchs as shoppers, event orgs, activity players.

Properties
- exceptions, xmas, fire...

# Fixtures
# Start/End 



=> Event 
[] removed fixtures from isAvailable.... rename isAvailable to assetAvailable, and add fixtures before it ....
=> Acivity , when adding activity, check upstream Asset compilies!!  // Availability Looking includes Events Fixutres Looking To, as Events use resource...


# Authentication
Assets can only be added by party owners, so if you are a primary only you can creat a new asset, to ensure this, you will be provided with a key, on accoutn client creation time!

# Billing
* At asset creation time, a charge and subscription plan should be created, it is these that are passed to activity and event organisers, equally when events and activities are created the charges should be created! 
* Endusers is created on primary account only
* Endusers is charged from primary account.
* Alliates is charged from primary account.