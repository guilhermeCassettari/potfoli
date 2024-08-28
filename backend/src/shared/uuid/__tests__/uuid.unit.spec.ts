import { uuid } from '../uuid';

describe('uuid function', () => {
  it('should generate a valid UUID', () => {
    const generatedUuid = uuid();

    expect(generatedUuid).toMatch(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    );
  });

  it('should generate a unique UUID each time', () => {
    const uuid1 = uuid();
    const uuid2 = uuid();

    expect(uuid1).not.toBe(uuid2);
  });
});
