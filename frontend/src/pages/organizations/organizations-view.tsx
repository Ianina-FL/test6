import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/organizations/organizationsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const OrganizationsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { organizations } = useAppSelector((state) => state.organizations);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View organizations')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View organizations')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{organizations?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.users_organization &&
                      Array.isArray(organizations.users_organization) &&
                      organizations.users_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.users_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Budgets organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>TotalBudget</th>

                      <th>Expenses</th>

                      <th>Income</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.budgets_organization &&
                      Array.isArray(organizations.budgets_organization) &&
                      organizations.budgets_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/budgets/budgets-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='total_budget'>{item.total_budget}</td>

                          <td data-label='expenses'>{item.expenses}</td>

                          <td data-label='income'>{item.income}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.budgets_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Events organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>EventTitle</th>

                      <th>StartDate</th>

                      <th>EndDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.events_organization &&
                      Array.isArray(organizations.events_organization) &&
                      organizations.events_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/events/events-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='title'>{item.title}</td>

                          <td data-label='start_date'>
                            {dataFormatter.dateTimeFormatter(item.start_date)}
                          </td>

                          <td data-label='end_date'>
                            {dataFormatter.dateTimeFormatter(item.end_date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.events_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Guests organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>GuestName</th>

                      <th>MealPreference</th>

                      <th>RSVPStatus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.guests_organization &&
                      Array.isArray(organizations.guests_organization) &&
                      organizations.guests_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/guests/guests-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='meal_preference'>
                            {item.meal_preference}
                          </td>

                          <td data-label='rsvp_status'>
                            {dataFormatter.booleanFormatter(item.rsvp_status)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.guests_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Vendors organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>VendorName</th>

                      <th>ContactInfo</th>

                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.vendors_organization &&
                      Array.isArray(organizations.vendors_organization) &&
                      organizations.vendors_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/vendors/vendors-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='contact_info'>{item.contact_info}</td>

                          <td data-label='rating'>{item.rating}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.vendors_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Venues organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>VenueName</th>

                      <th>Location</th>

                      <th>Capacity</th>

                      <th>IsBooked</th>

                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.venues_organization &&
                      Array.isArray(organizations.venues_organization) &&
                      organizations.venues_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/venues/venues-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='location'>{item.location}</td>

                          <td data-label='capacity'>{item.capacity}</td>

                          <td data-label='is_booked'>
                            {dataFormatter.booleanFormatter(item.is_booked)}
                          </td>

                          <td data-label='address'>{item.address}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.venues_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/organizations/organizations-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

OrganizationsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ORGANIZATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default OrganizationsView;
